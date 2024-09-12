import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

const App = () => {
  const [cedulas, setCedulas] = useState([]);
  const [valor, setValor] = useState('');


  const calcularCedulas = () => {
    const valorNumerico = parseInt(valor);

    const notas = {
      '50': 0,
      '20': 0,
      '10': 0,
    };

    let cedulasRestante = valorNumerico;

    while (cedulasRestante >= 50) {
      notas['50']++;
      cedulasRestante -= 50;

    }

    while (cedulasRestante >= 20) {
      notas['20']++;
      cedulasRestante -= 20;
    }

    while (cedulasRestante >= 10) {
      notas['10']++;
      cedulasRestante -= 10;

    }

    const somaCedulas = Object.entries(notas)
      .filter(([valor, quantidade]) => quantidade > 0)
      .map(([valor, quantidade]) => ({ valor, quantidade }));

    setCedulas(somaCedulas);
  };





  return (
    <View style={styles.container}>
      <Text>Digite o valor a ser retirado (múltiplo de 10)</Text>
      
      <TextInput style={styles.input} keyboardType="numeric"
        onChangeText={setValor}
        value={valor}
      />
      <Button title="Calcular Retirada" onPress={calcularCedulas} />

      <FlatList
        data={cedulas}
        keyExtractor={(item) => item.valor.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>R$ {item.valor}: {item.quantidade} nota(s)</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  item: {
    marginBottom: 15,
    padding: 5,
  },
});

export default App;
