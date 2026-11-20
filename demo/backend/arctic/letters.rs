//! Signs read from the ice, a logging macro and the async watch.

use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};

use crate::ice::{Entry, Logged, Logbook, Sea};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[non_exhaustive]
pub enum Sign {
    Fair,
    Storm,
    TheWanderer,
}

impl From<&Entry> for Sign {
    fn from(e: &Entry) -> Self {
        match (e.sea, e.souls) {
            (Sea::Gale { broken: true }, _) => Sign::TheWanderer,
            (Sea::Gale { .. }, s) if s <= 4.0 => Sign::Storm,
            (Sea::Fog(n @ 1..=3), _) if n % 2 == 1 => Sign::Storm,
            _ => Sign::Fair,
        }
    }
}

/// Repeats a log line, separated by a pipe: `entry!("Archangel", times = 3)`.
macro_rules! entry {
    ($words:expr) => {
        entry!($words, times = 1)
    };
    ($words:expr, times = $n:literal) => {{
        let line: Vec<&str> = std::iter::repeat($words).take($n).collect();
        format!("{}\n", line.join(" | "))
    }};
}
pub(crate) use entry;

/// A future that resolves at once; stands in for a real lookout.
struct Sensor<'a> {
    log: &'a Logbook<Entry>,
}

impl Future for Sensor<'_> {
    type Output = Option<f64>;

    fn poll(self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
        Poll::Ready(self.log.iter().map(Logged::souls).reduce(f64::min))
    }
}

pub async fn watch_the_ice(log: &Logbook<Entry>, threshold: f64) -> Result<Sign, &'static str> {
    let souls = Sensor { log }.await.ok_or("no entries")?;
    let raw = b"\x7fSPARK";
    // SAFETY: the bytes after the first are plain ASCII, so they are valid UTF-8.
    let seal = unsafe { std::str::from_utf8_unchecked(&raw[1..]) };
    match log.fewest(threshold) {
        Some(entry) if seal == "SPARK" => Ok(Sign::from(entry)),
        Some(_) => Err("the seal is broken"),
        None if souls > threshold / 2.0 => Ok(Sign::Storm),
        None => Ok(Sign::Fair),
    }
}
