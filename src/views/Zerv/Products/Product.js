import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, CardHeader, Col, Row, Link, Table } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadProduct } from '../../../actions/zervio/product';

import productsData from './ProductsData';

const loadData = ({ id, loadProduct }) => {
  loadProduct(id);
}

class Product extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    product: PropTypes.object,
    loadProduct: PropTypes.func.isRequired
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
    if (nextProps.id !== this.props.id) {
      loadData(nextProps)
    }
  }

  render() {
    const { id, product } = this.props;
    if (!product) {
      return <h3><i>Loading product...</i></h3>
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>{product.name}</strong>
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td>Actions</td>
                    </tr>
                    <tr>
                      <td>{product.name}</td>
                      <td><a href={`#/products/${product.id}/edit`}>Edit</a></td>
                    </tr>
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
  const id = ownProps.match.params.id;

  const {
    zervio: {
      entities: { products }
    }
  } = state

  return {
    id,
    product: products[id]
  }
}

export default withRouter(connect(mapStateToProps, {
  loadProduct
})(Product))
