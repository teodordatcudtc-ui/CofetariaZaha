# Pozele Produselor

Acest folder conține pozele reale pentru toate produsele din cofetărie.

## Structura fișierelor

Fiecare produs trebuie să aibă o poză cu numele corespunzător slug-ului său:

- `galusti-cu-prune.jpg` - pentru produsul "Găluști cu prune"
- `caserola-mini-prajituri.jpg` - pentru produsul "Caserolă mini prăjituri"
- `mini-tarte-bezea-lamai.jpg` - pentru produsul "Mini tarte bezea și lămâie"
- etc.

## Formatul imaginilor

- **Format**: JPG sau PNG
- **Dimensiuni recomandate**: 500x400px sau mai mari (raport 5:4)
- **Calitate**: Înaltă calitate pentru a arăta bine pe toate dispozitivele
- **Numele fișierului**: Trebuie să corespundă exact cu slug-ul produsului din cod

## Slug-urile produselor

Pentru a vedea toate slug-urile produselor, verifică fișierul `app/produse/page.tsx` în secțiunea `products` array.

## Utilizare

Pozele sunt folosite automat în:
1. **Pagina produse** (`/produse`) - în chenarele produselor
2. **Paginile individuale** (`/produse/[slug]`) - ca imagine principală a produsului

Același produs va folosi aceeași poză în ambele locuri pentru consistență.
