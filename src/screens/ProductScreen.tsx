/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';

import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route, navigation}: Props) => {
  const {id, name = ''} = route.params;
  const {categories, isLoading} = useCategories();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: name || 'Nuevo Producto',
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={name}
        />

        <Text style={styles.label}>Categoria:</Text>
        {isLoading ? (
          <ActivityIndicator
            color="#5856D6"
            size={30}
            style={{marginVertical: 60}}
          />
        ) : (
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            {categories.map(category => (
              <Picker.Item
                label={category.nombre}
                value={category._id}
                key={category._id}
              />
            ))}
          </Picker>
        )}

        <Button title="Guardar" onPress={() => {}} color="#5856D6" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Button title="Cámara" onPress={() => {}} color="#5856D6" />
          <Button title="Galería" onPress={() => {}} color="#5856D6" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 10,
  },
});
