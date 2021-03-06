import React from 'react'
import axios from 'axios'
import './PokeModal.css'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'




const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon'
const randomized = () => Math.floor(Math.random() * 250)
const moveOne = randomized();
const moveTwo = randomized();
const moveThree = randomized();
const moveFour = randomized();
console.log(moveOne)
console.log(moveTwo)
console.log(moveThree)
console.log(moveFour)

class PokeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon: {
                types: [],
                moves: [],
                stats: []
            },
            modal: this.props.stateModal
        }
    }



    UNSAFE_componentWillReceiveProps() {
        axios.get(`${pokemonUrl}/${this.props.keyModal + 1}`)
            .then(response => {
                this.setState({ pokemon: response.data })
            })
            .catch(err => console.log(err))
    }

    movesDisplayer = () => {

        if (this.state.pokemon.moves[1] !== undefined) {

            return (
                <>
                    <p> {`${this.state.pokemon.moves[moveOne % (this.state.pokemon.moves.length)].move.name}`} </p>
                    <p> {`${this.state.pokemon.moves[moveTwo % (this.state.pokemon.moves.length)].move.name}`} </p>
                    <p> {`${this.state.pokemon.moves[moveThree % (this.state.pokemon.moves.length)].move.name}`} </p>
                    <p> {`${this.state.pokemon.moves[moveFour % (this.state.pokemon.moves.length)].move.name}`} </p>
                </>
            )
        }
    }

    render() {

        const randomMove = (Math.random() * ((this.state.pokemon.moves.length) - 1) + 1)


        return (

            <div>
                <Modal isOpen={this.props.stateModal} toggle={this.props.changeStateModal} className="pokeModal">
                    <ModalHeader className="pokeModalHeader">
                        <div className="pokeModalTitle">
                            <p>{this.props.namePokemon}</p>
                        </div>
                        <div className="pokeModalSprites">
                            <img className="pokeImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.keyModal + 1}.png`} alt="front sprite on card" />
                            <img className="pokeImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.props.keyModal + 1}.png`} alt="front sprite on card" />
                        </div>

                    </ModalHeader>
                    <ModalBody className="pokeModalBody">
                        <div>
                            <p>Type : {`${this.state.pokemon.types.map(x => x.type.name)} `}</p>
                            <p>Height : {this.state.pokemon.height}</p>
                            <p>Weight : {this.state.pokemon.weight}</p>
                        </div>

                        <span className="pokeModalSpan">Stats</span>
                        {this.state.pokemon.stats.map(x =>
                            <p>{x.stat.name} {x.base_stat}</p>)
                        }

                        <span className="pokeModalSpan">Moves</span>

                        {this.movesDisplayer()}

                    </ModalBody>
                </Modal>
            </div >



        );
    }
}

export { moveOne, moveTwo, moveThree, moveFour }
export default PokeModal;