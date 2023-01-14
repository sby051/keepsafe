# KeepSafe

`KeepSafe` is the easiest way to store notes in a locally encrypted vault.

<img src="https://media.discordapp.net/attachments/1061745116169117848/1061745135576174654/image.png?width=1406&height=715"/>

**How does it work?**

KeepSafe is a web applicaiton written using Svelte/SvelteKit. It utilises API endpoints to encrypt & decrypt a serialised JSON object storing user created notes. This object is stored in the browser's localStorage as a hexadecimal representation of the encrypted bytes. The encryption used is AES using 128-bit (16 byte) block sizes in CTR mode.

To perform all cryptographic operation, the [`aes-js`](https://www.npmjs.com/package/aes-js) package was used.

**Usage**
---
Simply navigate to the [`KeepSafe`](https://keepsafe.sby051.live) website!

Mirrors:
- https://keepsafe-sby051.vercel.app
- https://keepsafe.sby051.live

**Self hosting**
---

1. Clone this repository locally
```bash
git clone https://github.com/sby051/keepsafe.git
```
2. Change to the repositories directory
```bash
cd keepsafe
```
3. Install dependencies
```bash
npm i
```
4. Launch the dev server
```bash
npm run dev
```
5. Enjoy!
