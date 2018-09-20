import React from 'react';

import { Badge} from 'reactstrap';

function ProductRow(props) {
  const product = props.product
  const productLink = `#/products/${product.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={product.id.toString()}>
        <th scope="row"><a href={productLink}>{product.id}</a></th>
        <td><a href={productLink}>{product.name}</a></td>
        <td>{product.registered}</td>
        <td>{product.role}</td>
        <td><Badge href={productLink} color={getBadge(product.status)}>{product.status}</Badge></td>
    </tr>
  )
}

export default ProductRow;
