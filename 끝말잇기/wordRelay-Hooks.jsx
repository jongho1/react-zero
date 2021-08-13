const React = require('react');
const {Component} = React;
const {useState, useRef} = React;

const WordRelay = () => {
    const [word, setWord] = useState('임종호');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(word[word.length-1] === value[0]){
            setWord(value);
            setValue('');
            setResult('딩동댕!')
            inputRef.current.focus();
        }else{
            setResult('땡!!!');
            setValue('');
            inputRef.current.focus();
        }
    };
    return (
        <>
        <div>{word}</div>
        <form onSubmit = {onSubmitForm}>
            <input type="text" ref={inputRef} value={value} onChange = {onChangeInput} />
            <button>입력!</button>
        </form>
        <div>{result}</div>
    </>
    );
}

// class WordRelay extends Component {
//     state = {
//         word : '제로초',
//         value : '',
//         result : '',
//     };

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if(this.state.word[this.state.word.length-1] === this.state.value[0]){
//             this.setState({
//                 word : this.state.value,
//                 value : '',
//                 result : '딩동댕!',
//             });
//             this.input.focus();
//         }else{
//             this.setState({
//                 value: '',
//                 result : '땡!',
//             });
//             this.input.focus();
//         }
//     };

//     onChangeInput = (e) => {
//         //e.target 이랑 e.currentTarget 이랑 차이점이 있다. 
//         this.setState({
//             value : e.target.value,
//         });
//     };

//     input;

//     onRefInput = (c) => this.input = c;

//     render(){
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit = {this.onSubmitForm}>
//                     <input type="text" ref={this.onRefInput} value={this.state.value} onChange = {this.onChangeInput} />
//                     <button>입력!</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         )
//     };
// }

module.exports = WordRelay;