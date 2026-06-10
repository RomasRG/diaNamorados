const quiz = [
{
question: "Qual dessas experiências parece mais atraente?",
answers: [
{text:"Experimentar algo moderno e diferente.", type:"A"},
{text:"Reunir a galera para compartilhar comida.", type:"B"},
{text:"Jantar em um lugar elegante.", type:"C"},
{text:"Encarar um desafio gastronômico.", type:"D"},
{text:"Fazer uma refeição rápida sem perder tempo.", type:"E"},
{text:"Descobrir um sabor que quase ninguém conhece.", type:"F"},
{text:"Encontrar os amigos em um ambiente descontraído.", type:"G"},
{text:"Aproveitar um almoço de família cheio de tradição.", type:"H"}
]
},
{
question: "Seu lema gastronômico seria:",
answers: [
{text:"Sempre aberto a novidades.", type:"A"},
{text:"Clássicos nunca falham.", type:"B"},
{text:"Qualidade acima de tudo.", type:"C"},
{text:"Quanto mais caprichado, melhor.", type:"D"},
{text:"Menos complicação, mais praticidade.", type:"E"},
{text:"O diferente chama minha atenção.", type:"F"},
{text:"Simples, saboroso e bem servido.", type:"G"},
{text:"Comida boa é sinônimo de acolhimento.", type:"H"}
]
},
{
question: "Escolha um ambiente:",
answers: [
{text:"Lugar moderno e estiloso.", type:"A"},
{text:"Mesa cheia de amigos.", type:"B"},
{text:"Restaurante sofisticado.", type:"C"},
{text:"Food truck famoso.", type:"D"},
{text:"Balcão rápido.", type:"E"},
{text:"Pequeno restaurante escondido.", type:"F"},
{text:"Barzinho com música ao vivo.", type:"G"},
{text:"Casa de fazenda com fogão a lenha.", type:"H"}
]
},
{
question: "Qual dessas qualidades mais combina com você?",
answers: [
{text:"Curiosidade.", type:"A"},
{text:"Sociabilidade.", type:"B"},
{text:"Refinamento.", type:"C"},
{text:"Intensidade.", type:"D"},
{text:"Objetividade.", type:"E"},
{text:"Originalidade.", type:"F"},
{text:"Descontração.", type:"G"},
{text:"Hospitalidade.", type:"H"}
]
},
{
question: "Quando você sai para comer, procura:",
answers: [
{text:"Algo que surpreenda.", type:"A"},
{text:"Algo que agrade todo mundo.", type:"B"},
{text:"Uma experiência memorável.", type:"C"},
{text:"Algo exagerado e divertido.", type:"D"},
{text:"Algo rápido e gostoso.", type:"E"},
{text:"Um sabor fora do comum.", type:"F"},
{text:"Um lugar simples com comida caprichada.", type:"G"},
{text:"Um prato que lembre casa.", type:"H"}
]
}
];

const results = {
A:{
title:"🍣 Sushi e Temaki",
desc:"Você gosta de novidades, experiências modernas e sabores surpreendentes.",
emoji:"🍣"
},
B:{
title:"🍕 A Boa e Velha Pizza",
desc:"Você é sociável, divertido e adora compartilhar bons momentos.",
emoji:"🍕"
},
C:{
title:"🍝 Massas Chiques",
desc:"Você valoriza elegância, qualidade e experiências refinadas.",
emoji:"🍝"
},
D:{
title:"🍔 Hambúrgueres Enormes",
desc:"Você ama intensidade, diversão e não passa despercebido.",
emoji:"🍔"
},
E:{
title:"🌭 Hot-Dog Simples",
desc:"Você é prático e acredita que simplicidade também pode ser perfeita.",
emoji:"🌭"
},
F:{
title:"🥟 Pastel Árabe Exótico",
desc:"Você adora fugir do óbvio e descobrir coisas novas.",
emoji:"🥟"
},
G:{
title:"🍢 Espetinho Bem Servido",
desc:"Você valoriza momentos descontraídos, boa companhia e sabor sem frescura.",
emoji:"🍢"
},
H:{
title:"🧀 Rica Comida Mineira",
desc:"Você ama tradição, aconchego e refeições cheias de afeto.",
emoji:"🧀"
}
};

let currentQuestion = 0;
let scores = {};

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

let selectedAnswer = null;

function loadQuestion() {
    const q = quiz[currentQuestion];

    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    selectedAnswer = null;
    nextBtn.disabled = true;

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.classList.add("answer");
        btn.textContent = answer.text;

        btn.addEventListener("click", () => {

            document
            .querySelectorAll(".answer")
            .forEach(a => a.classList.remove("selected"));

            btn.classList.add("selected");

            selectedAnswer = answer.type;

            nextBtn.disabled = false;
        });

        answersEl.appendChild(btn);
    });
}

nextBtn.addEventListener("click", () => {

    scores[selectedAnswer] =
        (scores[selectedAnswer] || 0) + 1;

    currentQuestion++;

    if(currentQuestion < quiz.length){
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult(){

    let winner = Object.keys(scores)
        .reduce((a,b)=>
            scores[a] > scores[b] ? a : b
        );

    const result = results[winner];

    document
        .getElementById("quiz-screen")
        .classList.add("hidden");

    document
        .getElementById("result-screen")
        .classList.remove("hidden");

    document.getElementById("emoji")
        .textContent = result.emoji;

    document.getElementById("result-title")
        .textContent = result.title;

    document.getElementById("result-description")
        .textContent = result.desc;
}

loadQuestion();