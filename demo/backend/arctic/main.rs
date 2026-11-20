//! Villa Diodati: Rust (source.rust).
//! Walton's Arctic log, split over three files:
//! `main.rs` (entry point), `ice.rs` (types, traits, generics) and `letters.rs` (macros, async).

mod ice;
mod letters;

use std::collections::HashMap;
use std::fmt::Write as _;
use std::future::Future;
use std::pin::pin;
use std::task::{Context, Poll, Waker};

use ice::{Entry, Logbook, Sea};
use letters::{entry, watch_the_ice, Sign};

/// Letters already sent from Archangel to Mrs Saville in England.
pub const LETTERS_SENT: f64 = 4.0;
static SHIP: &str = "Walton";
const MOTTO: &str = r#"Did I request thee, Maker, from my clay / To mould me Man?"#;

#[derive(Debug, Default)]
struct Census<'a> {
    ship: &'a str,
    sightings: HashMap<Sign, u32>,
}

impl<'a> Census<'a> {
    fn new(ship: &'a str) -> Self {
        Self { ship, ..Default::default() }
    }

    fn record(&mut self, sign: Sign) -> &mut Self {
        *self.sightings.entry(sign).or_insert(0) += 1;
        self
    }
}

fn main() -> Result<(), ice::VoyageError> {
    let log: Logbook<Entry> = "04:12 gale 12\n08:40 ice 11\n16:31 gale 7\n23:58 fog 1"
        .parse()?;

    let mut census = Census::new(SHIP);
    for reading in log.iter().filter(|r| matches!(r.sea, Sea::Gale { .. })) {
        census.record(Sign::from(reading));
    }

    let fewest = log
        .iter()
        .map(|r| r.souls)
        .fold(f64::MAX, f64::min);

    // Poll the lookout once with a no-op waker; the ice answers immediately.
    let mut watcher = pin!(watch_the_ice(&log, 5.0));
    let mut cx = Context::from_waker(Waker::noop());
    let verdict = match watcher.as_mut().poll(&mut cx) {
        Poll::Ready(Ok(sign)) => format!("the lookout sends {sign:?}"),
        Poll::Ready(Err(err)) => format!("the lookout is silent: {err}"),
        Poll::Pending => String::from("still waiting in the pack ice"),
    };

    let mut report = String::new();
    writeln!(report, "{:<12}|{:>8.0} souls  ({LETTERS_SENT} letters)", census.ship, fewest).unwrap();
    writeln!(report, "{verdict}; {} kinds of sign, 0x{:04X}", census.sightings.len(), 0x2f_u16).unwrap();
    print!("{report}{}", entry!(MOTTO, times = 2));
    Ok(())
}
