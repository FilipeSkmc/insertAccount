import { LightningElement, track } from 'lwc';

//importa método da classe que deve ser usada
import createAccount from '@salesforce/apex/ContaLwc.createAccount';

export default class NewAccountCold extends LightningElement {
    //será responsável por armazenar mensagens de erro
    @track error;
    //será responsável por armazenar o id da conta Criada
    @track createdAccountId;
    
    //objeto com os dados do form, que será usado para enviar os dados para Org
    @track account = {
        name: "",
        phone: "",
        website: ""
    };
    
    handleInputChange(event){
        let name_ = event.target.name;
        let value_ = event.target.value;

        this.account = {...this.account, [name_]:value_};
        console.log(this.account);
    }

    /**
     * o MÉTODO será responsavel por executar a função createAccount.
     * 
     * then(
     *      caso ocorra sucesso na operação ele faz alguma coisa
     * ).catch(
     *      caso falhe ele faz alguma sobre a falha
     * );
     * 
     * função anonima - uma função que é executada automaticamente, não possui nome
     * 
     * (parametros) => {
     *  comandos
     * }
     */
    handleInsertAccount(){
        createAccount(this.account).then(
            (result) => {
                if(result){
                    this.createdAccountId = result.Id;
                }else{
                    this.error = "Não foi possivel criar a conta";
                }
            }
        ).catch(
            (error) => {
                this.error = error;
                console.log(error);
            }
        )
    }

}