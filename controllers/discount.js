exports.getDiscountedPrice = (bundles) => {
    const totalOriginal = bundles.reduce(
        (sum, p) => sum + p.salePrice || p.price,
        0
      );
    let s =  totalOriginal * 0.9;
    return s
}