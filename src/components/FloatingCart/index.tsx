import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    // funcao que retorna o total de dinheiro a pagar
    const total = products.reduce((accumulator, item) => {
      const productsSubTotal = item.quantity * item.price;

      return accumulator + productsSubTotal;
    }, 0);

    // retorna o total
    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    // total de items do carrinho
    const totalCarrinho = products.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);

    return totalCarrinho;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
