import React from "react";

function Footer() {
  return (
    <footer className="info">
      <p>Click to edit a todo</p>
      <p>
        Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
      </p>
      <p>
        Part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  );
}

export default React.memo(Footer); // memo ile sarmalayınca tekrar tekrar render etmez. footer hep sabit bir alan zaten.
