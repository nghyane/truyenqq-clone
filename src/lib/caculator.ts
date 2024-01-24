export const ratingCalculator = (viewCount: number, likeCount: number) => {

    const viewWeight = 0.6
    const bookmarkWeight = 0.4

    const minRating = 3;
    const maxRating = 5;

   

    return Math.min(maxRating, Math.max(minRating, (viewCount * viewWeight + likeCount * bookmarkWeight) / (viewWeight + bookmarkWeight)))
}