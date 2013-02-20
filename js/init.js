// NAMESPACE
P = function(ns){
	var P = window.P || {};

	ns.split('.').forEach(function(v,k){
		P = (undefined === P[v]) ? (P[v] = {}) : P[v];
	});

	return P;
};
