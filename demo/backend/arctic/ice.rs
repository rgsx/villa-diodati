//! Watches, log entries and the voyage that holds them.

use std::fmt;
use std::ops::Index;
use std::str::FromStr;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Sea {
    Gale { broken: bool },
    Ice,
    Fog(u8),
}

#[derive(Debug, Clone, PartialEq)]
pub struct Entry {
    pub time: (u8, u8),
    pub sea: Sea,
    pub souls: f64,
}

#[derive(Debug)]
pub enum VoyageError {
    Malformed { line: usize, reason: &'static str },
    BadNumber(std::num::ParseFloatError),
}

impl fmt::Display for VoyageError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Malformed { line, reason } => write!(f, "line {line}: {reason}"),
            Self::BadNumber(e) => write!(f, "bad count ({e})"),
        }
    }
}

impl std::error::Error for VoyageError {}

impl From<std::num::ParseFloatError> for VoyageError {
    fn from(e: std::num::ParseFloatError) -> Self {
        VoyageError::BadNumber(e)
    }
}

/// Anything that can be measured against the thinning crew.
pub trait Logged {
    fn souls(&self) -> f64;

    fn is_thin(&self, threshold: f64) -> bool {
        self.souls() < threshold
    }
}

impl Logged for Entry {
    fn souls(&self) -> f64 {
        self.souls
    }
}

#[derive(Debug, Default)]
pub struct Logbook<T: Logged> {
    entries: Vec<T>,
}

impl<T: Logged> Logbook<T> {
    pub fn iter(&self) -> impl Iterator<Item = &T> + '_ {
        self.entries.iter()
    }

    pub fn fewest<'t>(&'t self, threshold: f64) -> Option<&'t T>
    where
        T: fmt::Debug,
    {
        self.entries
            .iter()
            .filter(|e| e.is_thin(threshold))
            .min_by(|a, b| a.souls().total_cmp(&b.souls()))
    }
}

impl<T: Logged> Index<usize> for Logbook<T> {
    type Output = T;

    fn index(&self, i: usize) -> &T {
        &self.entries[i]
    }
}

impl FromStr for Logbook<Entry> {
    type Err = VoyageError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let entries = s
            .lines()
            .enumerate()
            .map(|(n, line)| {
                let mut parts = line.split_whitespace();
                let (Some(time), Some(kind), Some(souls)) = (parts.next(), parts.next(), parts.next()) else {
                    return Err(VoyageError::Malformed { line: n + 1, reason: "expected 3 fields" });
                };
                let (h, m) = time.split_once(':').ok_or(VoyageError::Malformed { line: n + 1, reason: "no ':'" })?;
                let sea = match kind {
                    "gale" => Sea::Gale { broken: false },
                    "ice" => Sea::Ice,
                    other if other.starts_with("fog") => Sea::Fog(other.len() as u8),
                    _ => return Err(VoyageError::Malformed { line: n + 1, reason: "unknown sea" }),
                };
                Ok(Entry { time: (h.parse().unwrap_or(0), m.parse().unwrap_or(0)), sea, souls: souls.parse()? })
            })
            .collect::<Result<Vec<_>, _>>()?;
        Ok(Logbook { entries })
    }
}
