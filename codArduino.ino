const int botao1 = 7;
const int botao2 = 4;

void setup() {
  Serial.begin(9600);

  pinMode(botao1, INPUT);
  pinMode(botao2, INPUT);

  Serial.println("===== Jogo iniciado | Botao liberado! =====");
}

void loop() {
  if (digitalRead(botao1) == HIGH) {
    Serial.println("Botao 1 pressionado");
    delay(300); 
  }

  if (digitalRead(botao2) == HIGH) {
    Serial.println("Botao 2 pressionado");
    delay(300);
  }
}