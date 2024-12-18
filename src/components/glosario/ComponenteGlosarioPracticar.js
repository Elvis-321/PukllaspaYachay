// src/components/glosario/ComponenteGlosarioPracticar.js
import React, { useState, useEffect } from "react";
import './ComponenteGlosarioPracticar.css'; // Asegúrate de importar el archivo CSS

// Función para desordenar el arreglo (barajar aleatoriamente)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function ComponenteGlosarioPracticar({ glosario }) {
  //glosario tiene un valor llamado img_glosario, quiero que tambien se muestre
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Para llevar el seguimiento de las preguntas
  const [message, setMessage] = useState(""); // Para mostrar el mensaje de felicitaciones
  const [answers, setAnswers] = useState([]); // Para almacenar las opciones de respuesta

  // Generar las opciones de respuesta para la pregunta actual
  const generateOptions = (currentQuestion) => {
    // Escogemos 4 respuestas aleatorias y 1 correcta (la palabra_pregunta)
    const randomAnswers = shuffleArray([
      ...glosario.filter((item) => item.palabra_quechua !== currentQuestion.palabra_quechua)
        .slice(0, 4),
      currentQuestion,
    ]);

    setAnswers(randomAnswers);
  };

  // Cuando cambia la pregunta, generar nuevas opciones
  useEffect(() => {
    const currentQuestion = glosario[currentQuestionIndex];
    if (currentQuestion) {
      generateOptions(currentQuestion);
    }
  }, [currentQuestionIndex, glosario]); // Ejecutar solo cuando cambia el índice de la pregunta

  // Manejar clic en una respuesta
  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer.palabra_quechua === glosario[currentQuestionIndex].palabra_quechua) {
      // Si es la respuesta correcta
      setMessage("¡Felicidades! Respuesta correcta.");
      setTimeout(() => {
        setMessage(""); // Limpiar mensaje después de un tiempo
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Avanzar a la siguiente pregunta
      }, 1000);
    } else {
      // Si es incorrecta
      setMessage("Respuesta incorrecta. Intenta nuevamente.");
    }
  };

  // Si ya se respondieron todas las preguntas, mostramos un mensaje final
  if (currentQuestionIndex >= glosario.length) {
    return <div>¡Has completado todas las preguntas! Felicitaciones.</div>;
  }

  // Obtener la pregunta actual
  const currentQuestion = glosario[currentQuestionIndex];

  return (
    <div className="question-container">
      <h2 className="question-title">Pregunta: ¿Cómo se dice "{currentQuestion.palabra_espanol}" en Quechua?</h2>
      <div className="message">{message && <p>{message}</p>}</div> {/* Mostrar el mensaje de felicitaciones o error */}
{/* Mostrar la imagen del glosario con la URL base añadida */} {currentQuestion.img_glosario ? ( <img src={`http://localhost:3001${currentQuestion.img_glosario}`} alt="Imagen del glosario" className="glosario-image" /> ) : ( <p>No hay imagen disponible</p> )}
       <div className="answer-buttons">
        {/* Mostrar las opciones de respuesta como botones */}
        {answers.map((item, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswerClick(item)} 
            className="answer-button"
          >
            {item.palabra_quechua}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ComponenteGlosarioPracticar;
