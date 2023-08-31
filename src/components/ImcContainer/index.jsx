import styles from './ImcContainer.modules.css'

const ImcContainer = ({ imc, classImc, allInputsValid }) => {

    let needsMedicalSupport = false;
    

    const bgClassSet = () => {
        switch (classImc) {
            case 'magreza':
                return 'caution'

            case 'normal':
                return 'normal';

            case 'sobrepeso':
                return 'caution';

            case 'obesidade':
                return 'danger';

            case 'obesidade grave':
                needsMedicalSupport = true;
                return 'emergency'

        }
    }

    const displayProduct = () => {
        if (allInputsValid) {
            return (
                <div className={styles.Container}>
                    <p className={`${styles.Container__imcValue} ${bgClassSet()}`}>{imc.toFixed(2)}</p>
                    <p className={styles.Container__imcClass} >O seu índice IMC é classificado como <span>'{classImc}'</span></p>
                    {needsMedicalSupport && (
                        <p className={styles.Container__imcHelpNeeded}>* É recomendada a procura de um médico especializado. *</p>
                    )}
                </div>
            )
        } else {
            return (
                <p className={styles.errorMsg}>
                    Algo deu errado... Insira valores válidos.
                </p>
            )
        }
    }

    return (
        displayProduct()
    )
}

export default ImcContainer;