import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchForm.css';

/**
 * SearchForm renders a controlled form for search term.
 */
function SearchForm({ searchApi, setAlerts }) {
  const [formData, setFormData] = useState({term: ""});
  const history = useHistory();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(currVal => ({ ...currVal, [name]: value }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (formData.term) {
      searchApi(formData.term);
      history.push(`/search?term=${formData.term}&page=${1}`);
    } else {
      setAlerts(["Please enter a search term!"])
    }
  }
  return (
    <form onSubmit={handleSubmit} className="SearchForm">
      <input placeholder="Search movie titles.." name="term" value={formData.term} onChange={handleChange} />
      <button type="Submit">Search</button>
    </form>
  );
}

export default SearchForm;