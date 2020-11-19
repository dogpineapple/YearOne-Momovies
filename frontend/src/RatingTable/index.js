import "./RatingTable.css";

/**
 * RatingTable renders the number of `thumbs_up` and `thumbs-down`
 * in a table.
 */
function RatingTable({ thumbs_up, thumbs_down }) {
  return (
    <table className="RatingTable">
      <thead>
        <tr>
          <th>Love it!</th>
          <th>Nah!</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{thumbs_up}</td>
          <td>{thumbs_down}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default RatingTable;