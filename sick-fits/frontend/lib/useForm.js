import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join(''); // gives an array of values from initial, and converts to string
  console.log('initial values ==', initialValues, initial);
  // when undefined initial state of loading changes to the data object
  // we need to update the state

  useEffect(() => {
    // this function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files; // this destrucuring gives the first array item
    }
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value, // this allows us to send form name, etx. price, and set state, dynamic state setting
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
