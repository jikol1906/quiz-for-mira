$(document).ready(function () {
  var questions = [
    {
      question:
        'Mit Unterstützung und Verständnis können Menschen mit einer Sprachentwicklungsstörung (SES) soziale, akademische und berufliche Erfolge erreichen.',
      answer: true,
      details:
        'Wenn qualitativ gute Unterstützung und Verständnis zur Verfügung stehen, können Menschen mit einer SES soziale, akademische und berufliche Erfolge erreichen.',
      didAnswer: false,
    },
    {
      question:
        'Menschen mit einer SES können Schwierigkeiten beim Schriftspracherwerb haben.',
      answer: true,
      details:
        'Der Schriftspracherwerb hängt von den jeweiligen sprachlichen Fähigkeiten ab und genau hier liegt das Hauptproblem bei Menschen mit einer SES.',
      didAnswer: false,
    },
    {
      question:
        'Eine SES ist eine verdeckte Form von Behinderung / eine unsichtbare Beeinträchtigung die ca. bei 1 von 14 Personen auftritt. / 1 von 14 Kindern hat eine unsichtbare Beeinträchtigung namens SES.',
      answer: true,
      details:
        'Menschen mit einer SES sehen nicht anders aus als andere Gleichaltrige, die Störung erscheint nicht sofort ersichtlich.',
      didAnswer: false,
    },
    {
      question: 'Menschen mit einer SES sind nicht intelligent.',
      answer: false,
      details:
        'Menschen mit einer SES haben Schwierigkeiten mit der Sprache, nicht mit der Intelligenz.',
      didAnswer: false,
    },
    {
      question:
        'Bei zweisprachigen Personen mit einer SES ist nur eine Sprache davon betroffen, die andere nicht.',
      answer: false,
      details:
        'Liegt eine SES vor, sind alle Sprachen, die diese Person spricht, davon betroffen.',
      didAnswer: false,
    },
    {
      question:
        'Kinder mit einer SES können auch Schwierigkeiten/Auffälligkeiten in den Bereichen Aufmerksamkeit, Fein- und Grobmotorik, Sprache und Verhalten aufweisen.',
      answer: true,
      details:
        'Obwohl die Sprachentwicklung das Hauptproblem darstellt, kann eine SES oft mit Herausforderungen/Schwierigkeiten in anderen Bereichen der Entwicklung einhergehen.',
      didAnswer: false,
    },
    {
      question:
        'Jugendliche mit einer SES profitieren nicht von einer sprachtherapeutischen Behandlung.',
      answer: false,
      details:
        'Untersuchungen zeigen, dass Jugendliche von spezieller/spezialisierter Unterstützung bei der/zurEntwicklung ihrer sprachlichen Fähigkeiten profitieren.',
      didAnswer: false,
    },
    {
      question:
        'Nur Kinder mit niedrigem sozial-ökonomischen Hintergrund sind von einer SES betroffen.',
      answer: false,
      details:
        'SES treten bei Kindern auf der ganzen Welt und in jedem sozialen Milieu auf.',
      didAnswer: false,
    },

    {
      question:
        'Die Ursache für eine SES ist unklar. Aber es treten familiäre Häufungen auf',
      answer: true,
      details:
        'Trotz der hohen Prävalenz ist die genaue Ursache von SES nach wie vor unbekannt. Eine SES kann familiär vererbt und durch genetische Faktoren beeinflusst werden.',
      didAnswer: false,
    },

    {
      question:
        'SES betreffen Erwachsene nicht. / Erwachsene sind nicht von einer SES betroffen. / SES treten bei Erwachsenen nicht auf.',
      answer: false,
      details:
        'Eine SES kann ein Leben lang bestehen bleiben, wenn sie nicht erkannt und nicht behandelt wird.',
      didAnswer: false,
    },
  ];
  var answers = [];
  var didClickFinish = false;

  var container = $('.container');

  for (let i = 0; i < questions.length; i++) {
    container.append(
      '<div class="question" id="' +
        i +
        '">' +
        '<h3>' +
        '<span class="question__number">#' +
        (i + 1) +
        ' </span>' +
        questions[i].question +
        '</h3>' +
        '<div class="question__label-group">' +
        '<label class="switch">' +
        ' <input type="radio" data-choice="true" name="' +
        i +
        '" />' +
        ' <span class="slider"></span>' +
        '</label>' +
        '<span>Richtig</span>' +
        '</div>' +
        '<div class="question__label-group">' +
        '<label class="switch">' +
        ' <input type="radio" data-choice="false" name="' +
        i +
        '"/>' +
        '<span class="slider"></span>' +
        ' </label>' +
        '  <span>Falsch</span>' +
        '</div>'
    );
  }

  for (let i = 0; i < questions.length; i++) {
    answers.push(false);

    $("input[type='radio'][name='" + i + "']").click(function () {
      updateAnswer($(this).attr('name'), $(this).attr('data-choice'));
    });
  }

  function updateAnswer(questionNumber, answer) {
    answers[questionNumber] = answer === 'true' ? true : false;
    questions[questionNumber].didAnswer = true;
  }

  function showResults() {
    if (!didClickFinish) {
      var correctAnswers = 0;

      var wrongStyles = {
        border: '4px solid red',
        background: ' rgba(128,0,0,.1)',
      };

      var correctStyles = {
        border: '4px solid green',
        background: 'rgba(0,128,0,.1)',
      };

      for (let i = 0; i < questions.length; i++) {
        var question = $('#' + i + '');
        if (questions[i].didAnswer && answers[i] !== questions[i].answer) {
          if (questions[i].answer) {
            $($('#' + i + '>.question__label-group')[1]).css(wrongStyles);
          } else {
            $($('#' + i + '>.question__label-group')[0]).css(wrongStyles);
          }
          question.append(
            '<p class="question__details">' + questions[i].details + '</p>'
          );
        } else if (!questions[i].didAnswer) {
          question.append(
            '<p class="question__details">' + questions[i].details + '</p>'
          );
        } else {
          if (questions[i].answer) {
            $($('#' + i + '>.question__label-group')[0]).css(correctStyles);
          } else {
            $($('#' + i + '>.question__label-group')[1]).css(correctStyles);
          }
          correctAnswers++;
        }
      }
      var score =
        '<h3>Sie haben ' +
        correctAnswers +
        '/' +
        questions.length +
        ' Fragen richtig beantwortet</h3>';
      var scoreBoard = '<div class="scoreboard">' + score + '</div>';
      container.prepend(scoreBoard);
      didClickFinish = true;
    }
  }

  container.append('<button class="btn" id="done-button">Fertig</button>');

  $('#done-button').on('click', function () {
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      800
    );

    showResults();
  });
});
