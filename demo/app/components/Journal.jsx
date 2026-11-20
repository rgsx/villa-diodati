// Villa Diodati: React in a .jsx file (source.js.jsx)
import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// One-line component
const Entry = (props) => <li className="entry">{props.page.place}</li>;

// Component with no logic outside JSX
const EntryList = ({ pages }) => (
  <ul className="entry-list">
    {pages.map((page) => (
      <Entry key={page.id} page={page} />
    ))}
  </ul>
);

// Hooks, conditional rendering and fragments
function Diary({ title, pages = [] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 data-night="november">{title}</h1>
      <button type="button" onClick={() => setOpen(!open)} disabled={!pages.length}>
        {open ? 'Close the journal' : "Read the night's work"}
      </button>
      {open && <EntryList pages={pages} />}
    </>
  );
}

Diary.propTypes = {
  title: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, place: PropTypes.string })),
};

// Class component
export default class Archive extends Component {
  state = { total: 0, next: null };

  handleClick = (place) => {
    this.setState(({ total }) => ({ total: total + 1, next: place }));
  };

  render() {
    const { total, next } = this.state;
    return (
      <Fragment>
        <Diary
          title="Victor Frankenstein's Journal"
          pages={[{ id: 1, place: 'Ingolstadt' }, { id: 2, place: 'The dreary night of November' }]}
        />
        <p className="status">
          Read {total} times, next: {next || 'nothing'} &mdash; Clerval arrives
        </p>
        <input value={next ?? ''} onChange={(e) => this.handleClick(e.target.value)} />
      </Fragment>
    );
  }
}
