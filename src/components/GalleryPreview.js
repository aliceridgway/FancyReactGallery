import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Media from 'react-media';
import GliderCarousel from './GliderCarousel';
import close from '../images/close.svg';

const GalleryPreview = ({ cake, preview, togglePreview }) => {

  // Ref required so that clicking outside of modal closes the modal.
  const ref = useRef();

  const handleClick = (e) => {
    if (!ref.current.contains(e.target)) togglePreview(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!preview) return null;

  return (
    <Overlay>
      <PreviewContainer ref={ref}>
        <Media
          queries={{
            small: '(max-width: 767px)',
            medium: '(min-width: 767px)',
          }}
        >
          {(matches) => (
            <>
              {matches.small && (
                <GliderCarousel>
                  {cake.images.map((image, i) => (
                    <PreviewImage
                      src={`${image.formats.small.url}`}
                      alt={cake.altText}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`small_${cake.strapiId}_${i}`}
                    />
                  ))}
                </GliderCarousel>
              )}
              {matches.medium && (
                <GliderCarousel>
                  {cake.images.map((image, i) => (
                    <PreviewImage
                      src={`${image.formats.medium.url}`}
                      alt={cake.altText}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`medium_${cake.strapiId}_${i}`}
                    />
                  ))}
                </GliderCarousel>
              )}
            </>
          )}
        </Media>

        <Info>
          <h3>{cake.cakeTitle}</h3>
          <p>{cake.cakeDescription}</p>
        </Info>

        <Close
          onClick={() => togglePreview(false)}
          type="button"
          aria-label="close"
        >
          <img src={close} alt="close preview" />
        </Close>
      </PreviewContainer>
    </Overlay>
  );
};

export default GalleryPreview;

// PROP TYPES //

GalleryPreview.propTypes = {
  preview: PropTypes.bool,
  togglePreview: PropTypes.func.isRequired,
  cake: PropTypes.shape({
    images: PropTypes.array.isRequired,
    cakeTitle: PropTypes.string,
    cakeDescription: PropTypes.string,
    altText: PropTypes.string.isRequired,
    strapiId: PropTypes.number.isRequired,
  }),
};

GalleryPreview.defaultProps = {
  preview: false,
  cake: {
    cakeTitle: '',
    cakeDescription: '',
  },
};

// STYLED COMPONENTS //

const Info = styled.div`
  padding: 0 1rem;
  max-height:150px;
  overflow:scroll;

  @media (min-width: 767px) {
    display: flex;
    max-height:400px;
    flex-direction: column;
    justify-content: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

const PreviewContainer = styled.div`
  position: fixed;
  display: block;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 500px;
  background: white;
  margin: 2rem auto;
  border-radius: 5px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: auto;
    display: flex;

    div {
      width: 300px;
    }
  }

  @media (min-width: 1200px) {
    width: 800px;
    div {
      width: 400px;
    }
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  background: lightblue;
  object-fit: contain;
  border-radius: 5px 5px 0 0;

  @media (min-width: 767px) {
    border-radius: 5px 0 0 0px;
  }
`;

const Close = styled.button`
  position: absolute;
  margin: 0;
  top: -12px;
  right: -12px;
  padding: 0;
  background: none;
  border: 0;

  img {
    width: 24px;
    height: 24px;
    opacity: 0.9;
  }
`;
