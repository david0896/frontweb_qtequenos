import React from 'react'

const Quantity = () => {
    const incrementValue = (index) => {
        if (values[index] < 99) {
          const newValues = [...values];
          newValues[index] += 1;
          setValues(newValues);
        }
    };

    const decrementValue = (index) => {
        if (values[index] > 0) {
            const newValues = [...values];
            newValues[index] -= 1;
            setValues(newValues);
        }
    };

    return (
        <div>
            <label htmlFor="bedrooms-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elegir cantidad:</label>
            <div className="relative flex items-center max-w-[11rem]">
                <button type="button" id="decrement-button" onClick={() => decrementValue(index)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                </button>
                <input 
                    type="text" 
                    className="bg-gray-50 border-x-0 border-gray-300 h-11  font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={values[index]} 
                    min="0" 
                    max="99"
                    required
                    readOnly
                />
                <button type="button" id="increment-button" onClick={() => incrementValue(index)} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default quantity