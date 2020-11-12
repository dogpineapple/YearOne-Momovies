import { useState } from 'react';
import './SearchForm.css';


function SearchForm({ searchApi }) {
  const [formData, setFormData] = useState({term: ""});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currVal => ({ ...currVal, [name]: value }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchApi(formData.term);
  }
  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <input placeholder="Search movie titles.." name="term" value={formData.term} onChange={handleChange} />
      <button type="Submit">Search</button>
    </form>
  );
}

export default SearchForm;