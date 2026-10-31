export default function Section({ id, title, children }) {
    return (
      <section id={id} className="section">
        <div className="container">
          <h2 className="section__title">
            <span className="section__hash">#</span> {title}
          </h2>
          {children}
        </div>
      </section>
    );
  }