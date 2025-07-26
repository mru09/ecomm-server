exports.getDiscountedPrice = (bundles) => {
    const totalOriginal = bundles.reduce(
        (sum, p) => sum + p.price,
        0
      );
    let s =  totalOriginal * 0.9;
    return s
}