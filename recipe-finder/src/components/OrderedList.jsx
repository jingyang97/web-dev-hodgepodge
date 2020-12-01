import React from 'react';
import CookingIcon from './CookingIcon';
import EggFriedIcon from './EggFriedIcon';


const OrderedList = ({cname, olist}) => {
    if (cname === 'instructions') {
        return (
            <ol className={cname}>
                {
                    olist.map((item, index) => {
                    return (
                    <li key={index}>
                        <CookingIcon/>{item}
                    </li>);
                    })
                }
            </ol>
        );
    } else if (cname === 'ingredients') {
        return (
            <ol className={cname}>
                {
                    olist.map((item, index) => {
                    return (
                    <li key={index}>
                        <EggFriedIcon/>{item}
                    </li>);
                    })
                }
            </ol>
        );
    } else {

        return (
            <ol className={cname}>
                {
                    olist.map((item, index) => {
                    return (
                    <li key={index}>{item}</li>);
                    })
                }
            </ol>
        );
    }
};

export default OrderedList;
