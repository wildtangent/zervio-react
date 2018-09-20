import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, CardHeader, Col, Row, Badge, Table } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadProducts } from '../../../actions/zervio/products';

import ProductRow from './ProductRow';

const loadData = ({ props, loadProducts }) => {
  loadProducts();
}

class Products extends Component {
  static propTypes = {
    products: PropTypes.object,
    loadProducts: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  render() {
    const { products } = this.props;

    if (!Object.entries(products)) {
      return <h1><i>Loading Products...</i></h1>
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                Products
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.values(products).map((product, key) => {
                        return (
                          <ProductRow key={key} product={product} />
                        )
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const {
    zervio: {
      entities: { products }
    }
  } = state

  return {
    products: products
  }
}

export default withRouter(connect(mapStateToProps, {
  loadProducts
})(Products))
