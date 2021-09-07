/// <reference types="react-scripts" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    chainId?: number
    request?: (...args: any[]) => Promise<string[]>
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
}
