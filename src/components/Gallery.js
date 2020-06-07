import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import GalleryPreview from './GalleryPreview';

const initialItems = 10;
const additionalItems = 4;

const allCakes = graphql`
  query {
    allStrapiCakes(sort: { fields: strapiId, order: DESC }) {
      edges {
        node {
          images {
            formats {
              small {
                url
              }
              medium {
                url
              }
            }
          }
          altText
          cakeTitle
          strapiId
        }
      }
    }
  }
`;

const Gallery = () => {
  const [preview, togglePreview] = useState(false);
  const [active, setActive] = useState({});
  const [thumbnails, setThumbnails] = useState([]);
  const [page, setPage] = useState(1);

  const data = useStaticQuery(allCakes);

  // Intersection observer required for infinite scroll
  const observer = useRef();

  const LoadMoreRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage(page + 1);
      });
      if (node) observer.current.observe(node);
    },
    [thumbnails],
  );

  useEffect(() => {
    let cakes = data.allStrapiCakes.edges;
    cakes = cakes.map((cake) => cake.node);
    setThumbnails(cakes.slice(0, initialItems + (page - 1) * additionalItems));
  }, [page]);

  const handleClick = (cake) => {
    togglePreview(true);
    setActive(cake);
  };

  return (
    <Container>
      {thumbnails.map((cake, i) => (
        <GalleryItem
          key={`thumbnail_${cake.strapiId}`}
          onClick={() => handleClick(cake)}
          ref={i === thumbnails.length - 4 ? LoadMoreRef : null}
        >
          <img
            src={`${cake.images[0].formats.small.url}`}
            alt={cake.altText}
          />
        </GalleryItem>
      ))}
      {preview && (
        <GalleryPreview cake={active} preview togglePreview={togglePreview} />
      )}
    </Container>
  );
};

export default Gallery;

// STYLED COMPONENTS //

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 7px;
  column-gap: 7px;
  justify-content: center;

  @media (min-width: 650px) {
    grid-template-columns: repeat(4, auto);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, auto);
  }
`;

const GalleryItem = styled.div`
  --width: 150px;
  width: var(--width);
  height: calc(var(--width) * 1.25);
  background: pink;
  border-radius: 5px;
  box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.1);
  border: 0;

  @media (min-width: 1200px) {
    --width: 250px;
    width: var(--width);
    height: calc(var(--width) * 1.25);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
`;
