import { scroller } from 'react-scroll';

/**
 * Scroll into view any given element ( IN context of it's parent container )
 * @param {node} componentName - Define a step index to navigate to
 * @param {number} duration - time of the scroll animation
 * @param {string} parentID - Define a step index to navigate to
 * @param {number} offset - scroll additional px ( like padding )
 */
export default function scrollTo({ componentName, duration, parentID, offset }) {
  scroller.scrollTo(componentName, {
    duration,
    delay: 50,
    smooth: true,
    containerId: parentID,
    align: 'top',
    offset,
  });
}
