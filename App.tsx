import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Polygon } from 'react-native-svg';
import Modal from 'react-native-modal';

const App = () => {
  const [catetoA, setCatetoA] = useState('');
  const [catetoB, setCatetoB] = useState('');
  const [hipotenusa, setHipotenusa] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const calcularHipotenusa = () => {
    const a = parseFloat(catetoA);
    const b = parseFloat(catetoB);

    if (!isNaN(a) && !isNaN(b)) {
      const c = Math.sqrt(a * a + b * b);
      setHipotenusa(c.toFixed(2));
    
    } else {
      setModalTitle('Error');
      setModalMessage('Por favor ingresa los valores en ambos campos.');
      setIsModalVisible(true);
    }
  };

  const limpiarCampos = () => {
    setCatetoA('');
    setCatetoB('');
    setHipotenusa('');
  };

  const renderTriangulo = () => {
    if (!isNaN(parseFloat(catetoA)) && !isNaN(parseFloat(catetoB))) {
      const a = parseFloat(catetoA);
      const b = parseFloat(catetoB);
      const triangleY = a;

      return (
        <Svg height="300" width="300">
          <Polygon
            points={`0,0 ${a},0 0,${b}`}
            fill="none"
            stroke="black"
            strokeWidth="2"
            transform={`rotate(-90) translate(-${a}, 0)`}
          />
        </Svg>
      );
    } else {
      return null;
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#f7630C' }]}>Cálculadora de Retenidas</Text>
      <View style={styles.trianguloContainer}>{renderTriangulo()}</View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Altura de la torre:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={catetoA}
          onChangeText={(text) => setCatetoA(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Distancia a la casa:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={catetoB}
          onChangeText={(text) => setCatetoB(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={calcularHipotenusa}>
          <LinearGradient
            colors={['#f7630C', '#FFA500']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={limpiarCampos}>
          <LinearGradient
            colors={['#f7630C', '#FFA500']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Limpiar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.result}>{hipotenusa}</Text>

      <Modal isVisible={isModalVisible} animationIn="fadeIn" animationOut="fadeOut">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.modalButton}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    width: 100,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
  trianguloContainer: {
    marginTop: 20,
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 50,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'hidden',
    backgroundColor: '#FFA500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    fontSize: 16,
    color: '#f7630C',
  },
});

export default App;
