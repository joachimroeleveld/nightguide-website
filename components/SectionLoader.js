import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Observer from '@researchgate/react-intersection-observer';
import memoize from 'lodash/memoize';
import Spinner from './Spinner';
import SectionHeader from './SectionHeader';

SectionLoader.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      filter: PropTypes.object.isRequired,
    })
  ).isRequired,
  renderSection: PropTypes.func.isRequired,
  fetchSectionsCb: PropTypes.func,
  preloadedSections: PropTypes.number,
};

SectionLoader.defaultProps = {
  preloadedSections: 1,
};

function SectionLoader(props) {
  const {
    sections,
    renderSection,
    preloadedSections,
    fetchSectionsCb,
    reachedEnd = false,
  } = props;

  const [fetchedSections, setFetchedSections] = useState([]);
  const [fetchingSections, setFetchingSections] = useState(false);
  const [loadedSections, setLoadedSections] = useState(preloadedSections);

  const allSections = sections.concat(fetchedSections);

  useEffect(() => {
    setLoadedSections(preloadedSections);
  }, [sections]);

  useEffect(() => {
    if (fetchSectionsCb && loadedSections <= allSections.length + 1) {
      fetchSections(loadedSections + 1);
    }
  }, [loadedSections]);

  const getAddSection = memoize(sectionIndex => ({ isIntersecting }) => {
    if (isIntersecting && sectionIndex === loadedSections - 1) {
      setLoadedSections(sectionIndex + 2);
    }
  });

  const fetchSections = async () => {
    if (fetchingSections || reachedEnd) return;

    setFetchingSections(true);
    try {
      const sections = await fetchSectionsCb();
      setFetchedSections(fetchedSections.concat(sections));
    } finally {
      setFetchingSections(false);
    }
  };

  return (
    <div className="container">
      {sections.slice(0, loadedSections).map((section, sectionIndex) => {
        return (
          <section
            className="section"
            key={JSON.stringify(section.filter) + sectionIndex}
          >
            <SectionHeader title={section.title} TitleElem={'h2'} />
            {renderSection(section)}
            <Observer onChange={getAddSection(sectionIndex)} treshold={0.5}>
              <div />
            </Observer>
          </section>
        );
      })}
      {fetchingSections && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .section {
          margin: 3em 0;
        }
        .spinner {
          display: flex;
          justify-content: center;
          margin-top: 4em;
        }
      `}</style>
    </div>
  );
}

export default memo(SectionLoader);
