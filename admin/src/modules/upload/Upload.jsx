import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import styles from './Upload.module.css';
import { backend } from '../../common/constants/constants';
import axios from 'axios'
import { toast } from 'react-toastify';
export default function Upload({ placeholder }) {
    const editorRefs = {
        question: useRef(null),
        a: useRef(null),
        b: useRef(null),
        c: useRef(null),
        d: useRef(null),
        e: useRef(null),
        correct: useRef(null),
    };

    const [question, setQuestion] = useState('');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [d, setD] = useState('');
    const [e, setE] = useState('');
    const [correct, setCorrect] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Start typing...',
        }),
        [placeholder]
    );

    // Function to handle changes in the editor content
    const handleEditorChange = (name, newContent) => {
        switch (name) {
            case 'question':
                setQuestion(newContent);
                break;
            case 'a':
                setA(newContent);
                break;
            case 'b':
                setB(newContent);
                break;
            case 'c':
                setC(newContent);
                break;
            case 'd':
                setD(newContent);
                break;
            case 'e':
                setE(newContent);
                break;
            case 'correct':
                setCorrect(newContent);
                break;
            default:
                break;
        }
    };

    // Function to add question data to an array
    const handleAddQuestion = () => {
        const questionData = {
            question,
            a,
            b,
            c,
            d,
            e,
            correct,
        };
        console.log(questionData); // Log the question data to see the result
    };

    const upload = async () => {
        try {
            const response = await axios.post(backend + "/insertQuestion", {
                question,
                a,
                b,
                c,
                d,
                e,
                correct
            })
            console.log(response);
            toast.success("Question Inserted successfully", {
                position: "bottom-center",
                theme: "colored"
            })
            setQuestion('');
            setA('')
            setB('')
            setC('')
            setD('')
            setE('')
            setCorrect('')
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "bottom-center",
                theme: "colored"
            })
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.row}>
                    <div className={styles.title}>Question</div>
                    <JoditEditor
                        ref={editorRefs.question}
                        value={question}
                        config={config}
                        tabIndex={1}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('question', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Option A</div>
                    <JoditEditor
                        ref={editorRefs.a}
                        value={a}
                        config={config}
                        tabIndex={2}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('a', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Option B</div>
                    <JoditEditor
                        ref={editorRefs.b}
                        value={b}
                        config={config}
                        tabIndex={3}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('b', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Option C</div>
                    <JoditEditor
                        ref={editorRefs.c}
                        value={c}
                        config={config}
                        tabIndex={4}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('c', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Option D</div>
                    <JoditEditor
                        ref={editorRefs.d}
                        value={d}
                        config={config}
                        tabIndex={5}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('d', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Option E</div>
                    <JoditEditor
                        ref={editorRefs.e}
                        value={e}
                        config={config}
                        tabIndex={6}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('e', newContent)}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.title}>Correct Answer</div>
                    <JoditEditor
                        ref={editorRefs.correct}
                        value={correct}
                        config={config}
                        tabIndex={7}
                        onBlur={() => { }}
                        onChange={(newContent) => handleEditorChange('correct', newContent)}
                    />
                </div>
                <button onClick={() => {
                    upload();
                }} className={styles.submit}>Add Question</button>
            </div>
        </div>
    );
}
