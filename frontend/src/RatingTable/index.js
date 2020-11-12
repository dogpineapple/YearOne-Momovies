import "./RatingTable.css";

function RatingTable({ thumbs_up, thumbs_down }) {
  return (
    <table>
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