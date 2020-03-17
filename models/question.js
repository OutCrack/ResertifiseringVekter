class Question {
  constructor(id, chapter, question, answers, correctAnswer, selectedAnswer) {
		this.id = id;
		this.chapter = chapter;
		this.question = question;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
		this.selectedAnswer = selectedAnswer;
	}
}

export default Question;
