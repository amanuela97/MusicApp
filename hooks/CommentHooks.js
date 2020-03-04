import {useState} from 'react';
import validate from 'validate.js';
import {fetchGET} from './APIHooks';
import {registerConstraints} from "../constants/ValidationConst";


const constraints = {
    comment: {
      presence: {
        message: 'cannot be blank.',
      },
      length: {
        minimum: 4,
        maximum: 30,
        message: 'must be at least 3 characters',
      },
    },
    
  };

const useCommentForm = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const handleComment = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                comment: text,
            }));
    };

    
    const validateField = (attr) => {
        const attrName = Object.keys(attr).pop(); // get the only or last item from array
        const valResult = validate(attr, constraints);
        console.log('valresult', valResult);
        let valid = undefined;
        if (valResult[attrName]) {
          valid = valResult[attrName][0]; // get just the first message
        }
        setErrors((errors) =>
          ({
            ...errors,
            [attrName]: valid,
            fetch: undefined,
          }));
      };

    

    return {
        handleComment,
        validateField,
        errors,
        setErrors,
        inputs,
    };
};

export default useCommentForm;