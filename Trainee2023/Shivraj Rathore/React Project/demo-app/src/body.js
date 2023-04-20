import './body.css'


const Main = () => {
  return (
    <div className="main">
      <h1>Welcome to my app!</h1>
      <p>This is the main component of my app.</p>
      <table className="my-table text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>555-555-1212</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>555-555-1212</td>
          </tr>
          <tr>
            <td>Bob Johnson</td>
            <td>bob@example.com</td>
            <td>555-555-1212</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Main;
