
import StatProps from '../../Props/stats';

function isDuplicate(statsArray: StatProps[], domain: string): boolean | StatProps {

    const foundObject = statsArray.find((obj) => {
        for (let key in obj) {
            if (obj[key] === domain) {
                return true;
            }
        }
        return false;
    });

    // Return the found object if it exists, or false otherwise
    return foundObject || false;

}

export default isDuplicate;
