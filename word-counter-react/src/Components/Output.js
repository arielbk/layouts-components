// Having this as a separate component may be superfluous, but... it's for practice

import React from 'react';

function Output(props) {
  let content = '';
  props.topWords.forEach(word => content += (<tr><td>yes</td></tr>));

  console.log(content);

  return (
    
  <table className="output-table">
  <thead>
    <tr>
      <th className="table-number">#</th>
      <th className="table-word">Word</th>
      <th className="table-frequency">Frequency</th>
    </tr>
  </thead>
  <tbody className="output">

    {content}

  </tbody>
</table>
  )
}

export default Output;