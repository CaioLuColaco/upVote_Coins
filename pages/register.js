import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import api from "./services/api";
import api2 from "./services/api2";
import React, { useEffect, useState } from "react";

export default function Register() {

    const [coinsKeys, setCoinsKeys] = useState([]);
    const [coins, setCoins] = useState([])


    const registerCoin = async (coinKey) => {
        await api.get(`/coins/shortName/${coinKey}`)
        .then((response) => alert("Essa moeda já está cadastrada!"))
        .catch((err) => {
            api.post("/coin", {
                name: coins[coinKey],
                price: 0,
                shortname: coinKey,
                votes: 0
            })
            .then((response) => {
                alert("Moeda cadastrada com sucesso!")
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
        })

    }

    useEffect(() => {
        api2.get("/xml/available/uniq?format=json")
        .then((response) => {
            setCoins(response.data)
            setCoinsKeys(Object.keys(response.data))
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>UpVote Coins</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Register your <a href="https://www.linkedin.com/in/caiolucenacolaco/">Coins!</a>
        </h1>

        <p className={styles.description}>
            <a href='/'><button className={styles.btn_window}>View Coins</button></a>
            <a href='/register'><button className={styles.btn_window}>Register Coins</button></a>
        </p>

        <div className={styles.grid}>

            {coinsKeys.map(coinKey => {
                return (
                    <a key={coinKey} onClick={() => registerCoin(coinKey)} className={styles.card}>
                        <h2>{coinKey}</h2>
                        <p className={styles.register}>REGISTER</p>
                    </a>
                )
            })}

        </div>

      </main>

      <footer className={styles.footer}>

        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            Caio Lucena Colaço
          </span>
        </a>
      
      </footer>
    </div>
    
  )
}
