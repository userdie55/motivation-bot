const categories = {
  lazy: ["лень", "не хочу", "позже", "завтра", "устал заниматься", "прокрастинирую", "нет сил"],
  tired: ["устал", "выгорел", "не могу", "надоело", "хочу спать", "ничего не радует"],
  fail: ["не получается", "ошибка", "провал", "фейл", "всё плохо", "неудача"],
  motivation: ["мотивация", "вдохновение", "помоги", "что делать", "как жить", "дай совет", "что посоветуешь"],
  lost: ["не знаю", "с чего начать", "запутался", "не понимаю", "куда идти"],
};

const answers = {
  lazy: [
    "Лень — твой суперпартнёр. Жалко, что он тоже безработный.",
    "Отдохни, ты ведь устал… ничего не делать тоже сложно.",
    "О, ты снова прокрастинируешь? Природа тобой гордится.",
    "Конечно, отдохни. Успех подождёт, он ведь никуда не спешит.",
    "Ты не ленишься — ты просто профессионально симулируешь размышления.",
  ],
  tired: [
    "Печаль? Отлично, материал для нового великого треда в Mattermost.",
    "Плакать в подушку — тоже вклад в экономику: прачечная же заработает.",
    "Да, жизнь сложная. Но у других хотя бы мемы лучше.",
    "Ты устал? А интернет устал от твоих жалоб.",
    "Может, просто выключи драму и включи свет?",
  ],
  fail: [
    "Ну, не у всех же получается. Кто-то должен быть примером того, как не надо.",
    "Ошибки — это опыт. У тебя, похоже, докторская диссертация.",
    "Не выходит? Отлично. Зато стабильность!",
    "Каждый провал делает тебя сильнее. Или просто раздражённее — тоже навык.",
    "Если не получается — просто назови это экспериментом.",
  ],
  motivation: [
    "Мотивация? А ты пробовал просто не быть собой?",
    "Ты можешь всё. Теоретически. Практически — спорно.",
    "Ты – огонь. Правда, чаще в режиме “тлею”",
    "Вставай, герой! Никто, кроме тебя, не сделает твою работу за еду.",
    "Мотивация закончилась на складе. Используй здравый смысл.",
  ],
  lost: [
    "Начни с жалоб. У тебя это получается идеально.",
    "Сначала кофе. Потом паникуй.",
    "Главное — начать. Остальное можно списать на судьбу.",
    "Если не знаешь, с чего начать, начни с ошибки. Всё равно к ней придёшь.",
    "Начни с чего угодно. Даже с тупости — она надёжна.",
  ],
  default: [
    "Ты уверен, что это вопрос, а не просто поток сознания?",
    "Окей. Записал тебя в клуб “я сам не знаю, что хотел спросить”.",
    "Ты либо гений, либо случайно нажал Enter. Пока склоняюсь ко второму.",
    "Мне бы твою уверенность писать такое без контекста.",
    "Ты сейчас случайно не тестируешь мой уровень сарказма? Потому что он уже на пределе.",
  ],
};

document
  .querySelector(".send-button")
  .addEventListener("click", createQuestion);
document.querySelector(".chat-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createQuestion();
  }
});

function createQuestion() {
  if (!document.querySelector(".chat-input").value.trim()) return;

  const userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.textContent = document.querySelector(".chat-input").value;
  document.querySelector(".chat-box").appendChild(userMessage);

  const botMessage = document.createElement("div");
  botMessage.className = "bot-message";
  botMessage.textContent = createAnswer(
    document.querySelector(".chat-input").value
  );
  document.querySelector(".chat-box").appendChild(botMessage);

  document.querySelector(".chat-input").value = "";
}

function createAnswer(text) {
  const categoryKey = getCategory(text);

  const reply = answers[categoryKey] || answers.default;
  return reply[Math.floor(Math.random() * reply.length)];
}

function getCategory(text) {
  const string = text.toLowerCase().split(" ");

  for (const [key, keywords] of Object.entries(categories)) {
    for (const word of string) {
      if (keywords.some((match) => word.includes(match))) return key;
    }
  }
  return "default";
}
