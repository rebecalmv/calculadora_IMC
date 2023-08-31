import { useEffect, useState } from 'react';
import styles from './ImcCalc.module.css';
import ImcContainer from '../ImcContainer';

const ImcCal = () => {

    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [imc, setImc] = useState(0);
    const [classImc, setClassImc] = useState('')
    const [allInputsValid, setAllInputsValid] = useState(false);
    const [calcOn, setCalcOn] = useState(false);

    useEffect(() => {
        checkClassImc();
    }, [imc]);

    const calcInit = () => {
        return setCalcOn(true)
    }
    const calcClean = () => {
        return setCalcOn(false);
    }

    const inputValidator = () => {
        if (isNaN(height) || isNaN(weight) || height === 0 || weight === 0) {
            return setAllInputsValid(false)
        } else {
            return setAllInputsValid(true)
        };
    };

    const imcOperation = () => {
        const imcTemp = (weight / (height * height));
        return setImc(imcTemp);
    };

    const checkClassImc = () => {
        if (imc < 18.5 && imc > 0) {
            return setClassImc('magreza')
        } if (imc >= 18.5 && imc <= 24.9) {
            return setClassImc('normal')
        } if (imc >= 25.0 && imc <= 29.9) {
            return setClassImc('sobrepeso')
        } if (imc >= 30.0 && imc <= 39.9) {
            return setClassImc('obesidade')
        } if (imc >= 40) {
            return setClassImc('obesidade grave')
        }
    }

    const clearValues = () => {
        setHeight(0);
        setWeight(0);
        setImc(0);
        calcClean();
    }

    const btnCalcSubmit = () => {
        imcOperation();
        inputValidator();
        calcInit();
    }


    return (
        <form className={styles.imcCalc}>
            <div className={styles.imcCalc__inputContainer}>
                <div className={styles.imcCalc__inputContainer__inputGroup}>
                    <label htmlFor="height-input">
                        Insira sua altura:
                    </label>
                    <input id="height-input" type="number" min="0" max="3" step="0.1" placeholder='0.00m'
                        onChange={e => { setHeight(parseFloat(e.target.value)) }} />
                </div>
                <div className={styles.imcCalc__inputContainer__inputGroup}>
                    <label htmlFor="weight-input">
                        Insira seu peso:
                    </label>
                    <input id="weight-input" type="number" min="0" placeholder='0kg'
                        onChange={e => { setWeight(parseFloat(e.target.value)) }}
                    />
                </div>
            </div>
            <div className={styles.imcCalc__buttonGroup}>
                <button className={`${styles.imcCalc__buttonGroup__button} ${styles.imcCalc__buttonGroup__buttonCalc}`} type="button" 
                    onClick={(e) => {
                        btnCalcSubmit();
                    }}
                >
                    Calcular
                </button>
                <button className={`${styles.imcCalc__buttonGroup__button} ${styles.imcCalc__buttonGroup__buttonClean}`} type="reset" 
                    onClick={() => {
                        clearValues();
                    }}
                >
                    Limpar
                </button>
            </div>
                {calcOn && (
                    <ImcContainer imc={imc} classImc={classImc} allInputsValid={allInputsValid}/>
                )}
        </form>
    )
}

export default ImcCal;