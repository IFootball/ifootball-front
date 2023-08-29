'use client'
import Image from 'next/image';
import style from '../../styles/intro.module.scss';
import logo from '../../public/images/logoFoot.png'
import DefaultButton from '@/components/DefaultButton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { verifyTerms, verifyToken } from '@/api/functions';
const Intro = () => {
    const router = useRouter();

    const verifySession = (): boolean => {
    
        const token = verifyToken();
    
        if (token) {
            router.push('/homepage');
            return true;
        } else {
            if (verifyTerms()) {
                router.push('/login');
            } else {
                router.push('/')
            }
            return false;
        }
    }
    
    useEffect(() => {
        verifySession()
    }, [])

    return (
        <div className={style.introPage}>
            <div className={style.introPageUtil}>
                <Image src={logo} alt='Logo IFootball' quality={100} />
                <div className={style.howToDo}>
                    <div className={style.leftColumn}>
                        <h3>Introdução:</h3>
                        <p>O sistema IFootball, desenvolvido pela turma do 4° ano do Técnico de Informática na disciplina de Tópicos Avançados de Informática com o professor Vinícius, tem como objetivo  simular uma situação de desenvolvimento no mercado real, visa entreter todos os usuários da melhor forma possível, se tornando útil para toda comunidade do IFRS - Campus Feliz.</p>
                        <p>Baseado no fantasy game Cartola FC, desenvolvido em 2005 pelo grupo SporTV, o IFootball tem como funcionalidades escalar times reais, tanto masculinos como femininos, pondo em evidência estatísticas extraídas do jogo real, traduzindo a pontos computados para cada time, de cada pessoa.</p>
                        <p>Em relação à proposta de implementação, o sistema foi desenvolvido para uso nas Interséries escolares, que serão realizadas nos dias 20 e 21 de Outubro de 2023, onde cada usuário pode escalar jogadores de diferentes turmas, com o objetivo de alcançar a maior pontuação possível.</p>
                        <p>O 4° ano do Técnico em Informática deseja uma boa sorte a todos os usuários do IFootball.</p>
                    </div>
                    <div className={style.rightColumn}>
                        <h3>Passo a passo do sistema:</h3>
                        <h4>Tela 1: Login</h4>
                        <ul>
                            <li>Na tela de login, insira seu email (institucional) e senha nos campos correspondentes.</li>
                            <li>Clique no botão "Entrar" para fazer o login na sua conta.</li>
                            <li>Caso não possua uma conta existente, clique em <em>Criar Usuário</em>.</li>
                        </ul>
                        <h4>Tela 2: Tela de Criar Usuário</h4>
                        <ul>
                            <li>Se você é um novo usuário, clique no link ou botão "Criar Usuário" na tela de login.</li>
                            <li>Na tela de criação de usuário, preencha os campos solicitados, incluindo seu email, nome e turma.</li>
                            <li>Crie uma senha segura e insira-a no campo apropriado.</li>
                            <li>Clique no botão "Criar Conta" para criar o usuário.</li>
                        </ul>
                        <h4>Tela 3: Tela Inicial</h4>
                        <ul>
                            <li>Após o login, você será direcionado para a tela inicial.</li>
                            <li>Nesta tela, você verá suas pontuações e posições atuais.</li>
                            <li>Explore os links ou botões para acessar outras telas, como "Escalação dos Times" e "Rankings".</li>
                            <li>Você também encontrará opções para acessar os times masculino e feminino.</li>
                        </ul>
                        <h4>Tela 4: Tela de Escalação dos Times</h4>
                        <ul>
                            <li>Clique no link ou botão "Escalação dos Times" na tela inicial.</li>
                            <li>Na tela de escalação, você verá uma lista de jogadores disponíveis para compor seu time.</li>
                            <li>Para escalar um jogador, clique no nome dele na lista. Você também pode definir um capitão e 2 reservas.</li>
                            <li>Certifique-se de clicar no botão "Confirmar" após fazer suas escolhas.</li>
                        </ul>
                        <h4>Tela 5: Tela de Rankings</h4>
                        <ul>
                            <li>Acesse a tela de rankings clicando no link ou botão correspondente na tela inicial.</li>
                            <li>Nesta tela, você encontrará o ranking de pontuações dos usuários do jogo.</li>
                            <li>Também verá a pontuação atualizada dos jogadores da vida real.</li>
                            <li>Explore as opções de classificação por diferentes critérios, como pontuação da rodada ou pontuação total.</li>
                        </ul>
                    </div>
                    <div className={style.pontuation}>
                        <h3>Pontuação:</h3>
                        <div>
                            <h4>Pontuações de Jogador de Linha:</h4>
                            <ul>
                                <li><strong>Gol:</strong> 8 Pontos</li>
                                <li><strong>Assistência:</strong> 5 Pontos</li>
                                <li><strong>Falta:</strong> -1 Ponto</li>
                                <li><strong>Cartão Amarelo:</strong> - 2 Pontos</li>
                                <li><strong>Cartão Vermelho:</strong> - 4 Pontos</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Pontuações específicas de goleiro:</h4>
                            <ul>
                                <li><strong>Partida sem tomar gol:</strong> 8 Pontos</li>
                                <li><strong>Defesa:</strong> 2 Pontos</li>
                                <li><strong>Defesa de pênalti:</strong> 8 Pontos</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={style.button}>
                    <DefaultButton text='CONTINUAR' action={() => {
                        try {
                            document.cookie = 'allow_terms=1; path=/;';
                            router.push('/login');
                            return true;
                        } catch (error) {
                            console.error('Erro ao configurar os termos:', error);
                            return false;
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}
export default Intro;