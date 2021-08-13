const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);
 

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second){
            setResult(`${value} 정답!!`);
            setValue('');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            inputRef.current.focus();
        }else{
            setResult('땡!!!');
            setValue('');
            inputRef.current.focus();
        }
    };
    return (
        <React.StrictMode>
            <div>
                {first} 곱하기 {second} 는 ?
            </div>
            <form onSubmit={onSubmitForm}>
                <input type="text" value={value}  onChange={onChangeInput} ref = {inputRef}/>
                <button>입력!</button>    
            </form>
            <div id="result">{result}</div>
        </React.StrictMode>
    );
}

export default GuGuDan;
// module.exports = GuGuDan;