// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [jsonInput, setJsonInput] = useState('');
//   const [response, setResponse] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [error, setError] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Set the website title
//   useEffect(() => {
//     document.title = 'YourRollNumber'; // Replace with your roll number
//   }, []);

//   const handleJsonInputChange = (e) => {
//     setJsonInput(e.target.value);
//   };

//   const handleOptionChange = (e) => {
//     const { options } = e.target;
//     const selected = Array.from(options).filter(option => option.selected).map(option => option.value);
//     setSelectedOptions(selected);
//   };

//   // const handleSubmit = async () => {
//   //   setError('');
//   //   setResponse(null);

//   //   // Validate JSON input
//   //   try {
//   //     const parsedInput = JSON.parse(jsonInput);
//   //     if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
//   //       setError('Invalid JSON structure. "data" should be an array.');
//   //       return;
//   //     }
//   //   } catch (e) {
//   //     setError('Invalid JSON input');
//   //     return;
//   //   }
  
//   //   try {
//   //     const result = await axios.post('http://localhost:3000/bfhl', {
//   //       json: jsonInput,
//   //     });
//   //     setResponse(result.data);
//   //     setShowDropdown(true);
//   //   } catch (err) {
//   //     setError(`Error while processing the request: ${err.response ? err.response.data : err.message}`);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     setError('');
//     setResponse(null);
  
//     // Validate JSON input
//     try {
//       const parsedInput = JSON.parse(jsonInput);
//       if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
//         setError('Invalid JSON structure. "data" should be an array.');
//         return;
//       }
//     } catch (e) {
//       setError('Invalid JSON input');
//       return;
//     }
  
//     try {
//       const result = await axios.post('http://localhost:3000/bfhl', {
//         data: JSON.parse(jsonInput).data,
//       });
//       setResponse(result.data);
//       setShowDropdown(true);
//     } catch (err) {
//       console.error('Error while processing the request:', err);
//       setError(`Error while processing the request: ${err.response ? err.response.data : err.message}`);
//     }
//   };
  

//   const filterResponse = (data) => {
//     if (!data || !selectedOptions.length) return data;

//     const filteredData = {};
//     if (selectedOptions.includes('Alphabets')) {
//       filteredData.alphabets = data.alphabets || [];
//     }
//     if (selectedOptions.includes('Numbers')) {
//       filteredData.numbers = data.numbers || [];
//     }
//     if (selectedOptions.includes('Highest lowercase alphabet')) {
//       filteredData.highestLowercase = data.highestLowercase || '';
//     }
//     return filteredData;
//   };

//   const filteredResponse = filterResponse(response);

//   return (
//     <div className="App">
//       <h1>YourRollNumber</h1> {/* Replace with your roll number */}

//       <textarea
//         rows="10"
//         cols="50"
//         value={jsonInput}
//         onChange={handleJsonInputChange}
//         placeholder="Enter JSON here"
//       />

//       <button onClick={handleSubmit}>Submit</button>

//       {error && <div style={{ color: 'red' }}>{error}</div>}

//       {showDropdown && (
//         <div>
//           <label htmlFor="options">Select options:</label>
//           <select id="options" multiple onChange={handleOptionChange}>
//             <option value="Alphabets">Alphabets</option>
//             <option value="Numbers">Numbers</option>
//             <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
//           </select>
//         </div>
//       )}

//       {response && (
//         <div>
//           <h2>Response:</h2>
//           <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Set the website title
  useEffect(() => {
    document.title = '21BCE2064'; // Roll number
  }, []);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setResponse(null);

    // Validate JSON input
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError('Invalid JSON structure. "data" should be an array.');
        return;
      }
    } catch (e) {
      setError('Invalid JSON input');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3000/bfhl', {
        data: JSON.parse(jsonInput).data,
      });
      setResponse(result.data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Error while processing the request:', err);
      setError(`Error while processing the request: ${err.response ? err.response.data : err.message}`);
    }
  };

  const filterResponse = (data) => {
    if (!data || !selectedOption) return data;

    const filteredData = {};
    if (selectedOption === 'Alphabets') {
      filteredData.alphabets = data.alphabets || [];
    }
    if (selectedOption === 'Numbers') {
      filteredData.numbers = data.numbers || [];
    }
    if (selectedOption === 'Highest lowercase alphabet') {
      filteredData.highestLowercase = data.highestLowercase || '';
    }
    return filteredData;
  };

  const filteredResponse = filterResponse(response);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Data Processing</h1>

      <div className="form-group">
        <textarea
          className="form-control"
          rows="5" // Reduced size
          value={jsonInput}
          onChange={handleJsonInputChange}
          placeholder="Enter JSON data here"
        />
      </div>

      <button className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>
        Submit
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {showDropdown && (
        <div className="mt-3">
          <label htmlFor="options" className="form-label">Select option:</label>
          <select id="options" className="form-select" onChange={handleOptionChange}>
            <option value="">-- Select an option --</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {response && (
        <div className="mt-3">
          <h2>Response:</h2>
          <pre className="bg-light p-3 border rounded">{JSON.stringify(filteredResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
