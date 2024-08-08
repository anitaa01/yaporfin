import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyServicesScreen = () => {

  const serviceDetails = [
    {
      title: "Componentes del Paquete",
      points: [
        "Instalación de Sensores: Detalles sobre la instalación y mantenimiento de los sensores.",
        "Acceso a la Plataforma Web/Móvil: Información sobre el acceso y uso de la plataforma para visualizar datos y reportes."
      ]
    },
    {
      title: "Plan del paquete",
      points: [
        "Único plan: Acceso a la aplicación Web/Móvil y a los sensores.",
        "Duración del Contrato: La duración del paquete contratado será de 6 meses.",
        "Política de Cancelación: Puedes cancelar el servicio notificando con 30 días de antelación. Si cancelas después de este período, se aplicará una penalización de un mes de servicio. Para cancelar, contacta a nuestro soporte al cliente."
      ]
    },
    {
      title: "Contacto y Soporte",
      points: [
        "Datos de Contacto: Ana Karen para soporte y atención al cliente.",
        "Horarios de Atención: Lunes a viernes de 9am a 5pm.",
        "Cómo contactarnos"
      ]
    }
  ];

  const sensorDetails = [
    {
      image: require('../assets/img/sensor1.png'),
      description: 'Temperatura: Calcula la temperatura del agua para que esté en el rango correcto',
    },
    {
      image: require('../assets/img/sensor2.png'),
      description: 'Conductividad: Monitorea la calidad de agua para que esté en posibles condiciones.',
    },
    {
      image: require('../assets/img/sensor3.png'),
      description: 'Sensor Ultrasónico: Mide la cantidad de agua que hay en el tinaco.',
    }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {serviceDetails.map((service, index) => (
        <View key={index} style={styles.cardWrapper}>
          <Card style={[styles.card, { backgroundColor: '#BCE6FF' }]}>
            <Card.Content>
              <Title style={styles.cardTitle}>{service.title}</Title>
              {service.title === "Componentes del Paquete" ? (
                <>
                  {service.points.map((point, idx) => (
                    <Paragraph key={idx} style={styles.cardText}>{`• ${point}`}</Paragraph>
                  ))}
                  <Paragraph style={styles.sensorHeader}>Sensores:</Paragraph>
                  <View style={styles.sensorContainer}>
                    {sensorDetails.map((sensor, sensorIdx) => (
                      <View key={sensorIdx} style={styles.sensorCard}>
                        <Image source={sensor.image} style={styles.sensorImage} />
                        <Paragraph style={styles.sensorDescription}>{sensor.description}</Paragraph>
                      </View>
                    ))}
                  </View>
                </>
              ) : service.title === "Plan del paquete" ? (
                service.points.map((point, idx) => (
                  <Paragraph key={idx} style={styles.cardText}>{`• ${point}`}</Paragraph>
                ))
              ) : service.title === "Contacto y Soporte" ? (
                service.points.map((point, idx) => (
                  <View key={idx} style={styles.contactItem}>
                    {idx === 0 && <Paragraph style={styles.cardText}>{`• ${point}`}</Paragraph>}
                    {idx === 1 && <Paragraph style={styles.cardText}>{`• ${point}`}</Paragraph>}
                    {idx === 2 && (
                      <View style={styles.contactChannels}>
                        <View style={styles.contactChannelItem}>
                          <Icon name="phone" size={20} color="black" style={styles.icon} />
                          <Paragraph style={styles.cardText}>Telefono: 664-826-2092</Paragraph>
                        </View>
                        <View style={styles.contactChannelItem}>
                          <Icon name="email" size={20} color="black" style={styles.icon} />
                          <Paragraph style={styles.cardText}>Email: soporte@example.com</Paragraph>
                        </View>
                        <View style={styles.contactChannelItem}>
                          <Icon name="chat" size={20} color="black" style={styles.icon} />
                          <Paragraph style={styles.cardText}>Chat en vivo: disponible en el sitio web</Paragraph>
                        </View>
                      </View>
                    )}
                  </View>
                ))
              ) : (
                service.points.map((point, idx) => (
                  <Paragraph key={idx} style={styles.cardText}>{`• ${point}`}</Paragraph>
                ))
              )}
            </Card.Content>
          </Card>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  card: {
    marginVertical: 10,
    padding: 10,
  },
  cardTitle: {
    color: 'black', // Cambia el color del texto del título aquí
  },
  cardText: {
    color: 'black', // Cambia el color del texto del contenido aquí
    marginVertical: 5,
    textAlign: 'justify', // Justifica el texto
  },
  contactItem: {
    marginVertical: 5,
  },
  contactChannels: {
    marginVertical: 10,
  },
  contactChannelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  sensorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que las imágenes se envuelvan si no caben en una sola línea
    justifyContent: 'space-between',
    marginTop: 20,
  },
  sensorCard: {
    width: '30%', // Ajusta el tamaño de las cards de sensores
    marginVertical: 10, // Añade espacio vertical entre las tarjetas
    padding: 0,
  },
  sensorImage: {
    width: '100%', // Ajusta el tamaño de las imágenes para que se adapten al ancho del contenedor
    height: 100, // Ajusta la altura de las imágenes de los sensores
    resizeMode: 'contain', // Asegura que la imagen se ajuste sin distorsión
  },
  sensorDescription: {
    textAlign: 'justify', // Justifica el texto
    marginTop: 5,
    color: '#333',
  },
  sensorHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MyServicesScreen;
