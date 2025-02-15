"use client"

import { useState } from "react"


type Transaction = {
  id: number
  date: string
  description: string
  amount: number
  time: string
}

const initialTransactions: Transaction[] = [
  { id: 1, date: "2025-02-14", time: "15:30", description: "Grocery shopping", amount: -75500 },
  { id: 2, date: "2025-02-13", time: "12:45", description: "Salary deposit", amount: 2500 },
  { id: 3, date: "2025-02-12", time: "19:20", description: "Restaurant bill", amount: -45000 },
  { id: 4, date: "2025-02-11", time: "10:15", description: "Gas station", amount: -50000 },
  { id: 5, date: "2025-02-10", time: "14:30", description: "Online purchase", amount: -120.75 },
]

export default function Corps() {
  const [transactions] = useState<Transaction[]>(initialTransactions)

  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex gap-2">
        <button className="flex items-center gap-x-2 border p-3 rounded-xl ">
          <img src="https://img.icons8.com/?size=100&id=37784&format=png&color=000000" className="h-4 w-4" />
          Ajouter
        </button>
        <button className="flex items-center gap-x-2 border p-3 rounded-xl">
          <img src="https://img.icons8.com/?size=100&id=VMo8ScDaJ5lL&format=png&color=000000" className="h-4 w-4" />
          Modifier
        </button>
      </div>

      <div className="space-y-3 justify-between">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <img src="https://img.icons8.com/?size=100&id=114428&format=png&color=000000" className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{transaction.description}</h3>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <img src="https://img.icons8.com/?size=100&id=bDrb5MdYaEje&format=png&color=000000" className="h-3 w-3" />
                  <span>
                    {transaction.date} à {transaction.time}
                  </span>
                </div>
              </div>
            </div>

            <div>
                <span className={`text-lg font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    {transaction.amount} FCFA
                </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="ml-2 gap-x-2 border p-3 rounded-xl">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

