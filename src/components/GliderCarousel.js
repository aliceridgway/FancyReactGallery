import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Glider from 'glider-js';
import 'glider-js/glider.min.css';
import '../styles/glider-overrides.css';
import arrowLeft from '../images/arrow-left.svg';
import arrowRight from '../images/arrow-right.svg';

const GliderCarousel = ({ children }) => {

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const glider = new Glider(document.querySelector('.glider'), {
      slidesToShow: 1,
      dots: '.dots',
      draggable: true,
      arrows: {
        prev: '.glider-prev',
        next: '.glider-next',
      },
    });
  }, []);

  return (

    <div className="glider-contain">

      <div className="glider">{children}</div>

      <button type="button" aria-label="Previous" className="glider-prev">
        <Icon src={arrowLeft} alt="" />
      </button>

      <button type="button" aria-label="Next" className="glider-next">
        <Icon src={arrowRight} alt="" />
      </button>

      <div role="tablist" className="dots" />

    </div>
  );
};

export default GliderCarousel;

GliderCarousel.propTypes = {
  children: PropTypes.node.isRequired,
};

const Icon = styled.img`
  height: 24px;
  width: 24px;
  margin: 0.25rem;
  opacity: 0.8;
`;
